import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from "react-device-detect";

// Actions
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectUserBets } from 'store/bets/selector';
import { selectUser } from 'store/user/selector';

// Components
import { Tooltip } from '@material-ui/core';
import { StatusComponent, TextBox } from 'components/index'
import { Loading, BettableMatch, Ranking, WeekSelector } from 'components_fa/index'

import styles from './Bets.module.scss';
import ROUTES from 'constants/routes';
import { TMatch } from 'store/matches/types';

const Bets = () => {
    const [betProgress, setBetProgress] = useState<number>(0);
    const [matchesCurrentStatus, setMatchesCurrentStatus] = useState<TMatch[]>([]);

    const dispatch = useDispatch();
    const matchesWithBets = useSelector(selectUserBets);
    const isLoading = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);

    const { week } = useParams<{ week: string }>();

    useEffect(() => {
        if (week) {
            dispatch(setCurrentWeek(parseInt(week)))
        }
    }, [dispatch, week]);

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
        let numOfBets = 0;
        matchesCurrentStatus.forEach((match) => {
            if (match.loggedUserBets !== null && match.loggedUserBets !== undefined) {
                numOfBets++
            }
        });

        return (
            <div>
                <p>
                    Apostas<br />
                    {numOfBets} / {matchesCurrentStatus.length}
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
        return matchesWithBets.map((match) => <BettableMatch {...match} key={match.id} onChange={onBetChange} />);
    };

    const renderPaymentBox = () => {
        const text = () => (
            <span>
                As apostas da temporada regular serão liberadas assim que identificarmos seu pagamento.<br /><br />
                Enquanto isso, divirta-se na pré-temporada - o ranking será zerado antes da temporada começar.
            </span>
        )
        return (
            <span><TextBox text={text}/><br /></span>
        )
    };

    const renderWarning = () => {
        const text = () => (
            <span>
                O ranking será zerado antes da temporada começar.
            </span>
        )
        return (
            <span><TextBox text={text}/><br /></span>
        )
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <WeekSelector routeTo={ROUTES.BETS.urlWithParams} onClick={onWeekClick} />
                {loggedUser && loggedUser.status === 0 && renderPaymentBox()}
                {loggedUser && loggedUser.status !== 0 && renderWarning()}
                <div className={styles.matchesContainer}>
                    {!isMobile && <div className={styles.header}>
                        <div style={{ flex: 2 }}>Visitante</div>
                        <div><Tooltip title="Mais de 7 pontos" placement="top" arrow><span>Fácil</span></Tooltip></div>
                        <div><Tooltip title="7 pontos ou menos" placement="top" arrow><span>Difícil</span></Tooltip></div>
                        <div><Tooltip title="7 pontos ou menos" placement="top" arrow><span>Difícil</span></Tooltip></div>
                        <div><Tooltip title="Mais de 7 pontos" placement="top" arrow><span>Fácil</span></Tooltip></div>
                        <div style={{ flex: 2 }}>Casa</div>
                    </div>}
                    {isLoading && <Loading overlay />}
                    {renderMatches()}
                </div>
            </div>
            {renderRanking()}
            <StatusComponent content={renderBetsStatus} progress={betProgress} />
        </div>
    );
};

export default Bets;
