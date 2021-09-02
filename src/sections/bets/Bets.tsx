import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from "react-device-detect";

// Actions
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectUserBets } from 'store/bets/selector';
import { selectUser } from 'store/user/selector';
import { selectSeasonStart } from 'store/app/selector';

// Components
import { Tooltip } from '@material-ui/core';
import { StatusComponent, TextBox } from 'components/index'
import { Loading, BettableMatch, Ranking, WeekSelector } from 'components_fa/index'

// Constants & Types
import ROUTES from 'constants/routes';
import { TMatch } from 'store/matches/types';

import styles from './Bets.module.scss';

const Bets = () => {
    const [betProgress, setBetProgress] = useState<number>(0);
    const [blockLoading, setBlockLoading] = useState<boolean>(false);
    const [matchesCurrentStatus, setMatchesCurrentStatus] = useState<TMatch[]>([]);
    const [numOfBets, setNumOfBets] = useState<number>(0);

    const dispatch = useDispatch();
    const matchesWithBets = useSelector(selectUserBets);
    const isLoading = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);
    const seasonStart = useSelector(selectSeasonStart);

    let currentTimestamp = Math.floor(Date.now() / 1000);
    const { week } = useParams<{ week: string }>();

    setTimeout(function () {
        currentTimestamp = Math.floor(Date.now() / 1000);
    }, 60000);

    useEffect(() => {
        if (week) {
            dispatch(setCurrentWeek(parseInt(week)))
        }
    }, [week]);

    useEffect(() => {
        if (blockLoading && !isLoading) {
            setBlockLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (matchesWithBets.length > 0) {
            setMatchesCurrentStatus(matchesWithBets);
        }
    }, [matchesWithBets]);

    useEffect(() => {
        const totalBets = matchesCurrentStatus.length;
        let numOfBets = 0;
        matchesCurrentStatus.forEach((match) => {
            if (match.loggedUserBets !== null && match.loggedUserBets !== undefined) {
                numOfBets++
            }
        });

        setBetProgress(100 * (numOfBets / totalBets));
    }, [matchesCurrentStatus]);

    const onWeekClick = (newWeek: number) => {
        dispatch(setCurrentWeek(newWeek));
        setBlockLoading(true);
    };

    const onBetChange = (id: number, betValue: number) => {
        const newMatchStatuses = [...matchesCurrentStatus];

        let foundIndex = newMatchStatuses.findIndex(x => x.id === id);
        if (foundIndex !== -1 && loggedUser) {
            newMatchStatuses[foundIndex].loggedUserBets = {
                id: 0,
                matchId: 0,
                value: betValue,
                user: { ...loggedUser, id: parseInt(loggedUser.id) }
            };
            setMatchesCurrentStatus(newMatchStatuses);
        }
    };

    const renderBetsStatus = () => {
        let betsDone = 0;
        matchesCurrentStatus.forEach((match) => {
            if (match.loggedUserBets !== null && match.loggedUserBets !== undefined) {
                betsDone++
            }
        });

        setNumOfBets(betsDone);

        return (
            <div>
                <p>
                    Apostas<br />
                    {betsDone} / {matchesCurrentStatus.length}
                </p>
            </div>
        )
    }

    const renderRanking = () => {
        if (isMobile) {
            return null
        };

        return <Ranking />;
    };

    const renderMatches = () => {
        return matchesWithBets.map((match) => (
            <BettableMatch
                {...match}
                isLoading={blockLoading}
                key={match.id}
                onChange={onBetChange}
            />
        ));
    };

    const renderTextBox = () => {
        const hasSeasonStarted = seasonStart === null ? false : currentTimestamp >= seasonStart;
        let text = '';

        if (loggedUser) {
            if (loggedUser.status === 0) { // Did not pay
                text = hasSeasonStarted
                    ? 'O prazo para efetuar o pagamento se esgotou. Nos vemos na próxima temporada!'
                    : 'As apostas serão liberadas assim que identificarmos seu pagamento.';
            } else { // Paid
                if (hasSeasonStarted) {
                    text = betProgress !== 100
                        ? `Atenção! Ainda restam ${matchesCurrentStatus.length - numOfBets} apostas a fazer nessa rodada.`
                        : '';
                } else {
                    text = 'Apostas extras ficam abertas somente até o kickoff da temporada!';
                }
            }
        }

        if (text === '') {
            return;
        }

        return (
            <span>
                <TextBox text={() => text} /><br />
            </span>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <WeekSelector routeTo={ROUTES.BETS.urlWithParams} onClick={onWeekClick} />
                {renderTextBox()}
                <div className={styles.matchesContainer}>
                    {!isMobile && <div className={styles.header}>
                        <div style={{ flex: 2 }}>Visitante</div>
                        <div><Tooltip title="Mais de 7 pontos" placement="top" arrow><span>Fácil</span></Tooltip></div>
                        <div><Tooltip title="7 pontos ou menos" placement="top" arrow><span>Difícil</span></Tooltip></div>
                        <div><Tooltip title="7 pontos ou menos" placement="top" arrow><span>Difícil</span></Tooltip></div>
                        <div><Tooltip title="Mais de 7 pontos" placement="top" arrow><span>Fácil</span></Tooltip></div>
                        <div style={{ flex: 2 }}>Casa</div>
                    </div>}
                    {blockLoading && <Loading overlay />}
                    {renderMatches()}
                </div>
            </div>
            {renderRanking()}
            <StatusComponent content={renderBetsStatus} progress={betProgress} />
        </div>
    );
};

export default Bets;
