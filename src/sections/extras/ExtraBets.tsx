import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Actions
import {
    fetchExtraBets,
} from 'store/bets/actions';

// Selectors
import {
    selectIsLoading
} from 'store/bets/selector';
import {
    selectCurrentSeason,
    selectSeasonStart,
} from 'store/app/selector';
import { selectUser } from 'store/user/selector';

// Components
import { Loading } from '@omegafox/components';
import { Button } from '@material-ui/core';
import styles from './ExtraBets.module.scss'
import AfterSeasonStart from './AfterSeasonStart';
import BeforeSeasonStart from './BeforeSeasonStart';

import logo from 'img/favicon.png';

export const EXTRA_SECTION = {
    AFC: 0,
    NFC: 1,
    PLAYOFFS: 2
};

type EXTRA_SECTION_TYPE = typeof EXTRA_SECTION[keyof typeof EXTRA_SECTION];

const ExtraBets = () => {
    const [hasSeasonStarted, setHasSeasonStarted] = useState<boolean>(false);
    const [extraSection, setExtraSection] = useState<EXTRA_SECTION_TYPE>(EXTRA_SECTION.AFC);
    const dispatch = useDispatch();

    const loggedUser = useSelector(selectUser);
    const currentSeason = useSelector(selectCurrentSeason);
    const isLoading = useSelector(selectIsLoading);
    const seasonStart = useSelector(selectSeasonStart);

    const isBetBlocked = loggedUser !== null && loggedUser.status === 0;
    let currentTimestamp = Math.floor(Date.now() / 1000);

    setTimeout(function () {
        currentTimestamp = Math.floor(Date.now() / 1000);
    }, 60000);

    useEffect(() => {
        if (seasonStart) {
            setHasSeasonStarted(currentTimestamp >= seasonStart);
        }
    }, [currentTimestamp, seasonStart]);

    useEffect(() => {
        if (currentSeason) {
            dispatch(fetchExtraBets(currentSeason) as any);
        }
    }, [currentSeason, dispatch]);

    const containerClass = classNames({
        [styles.container]: !isMobile,
        [styles.containerMobile]: isMobile
    });

    return (
        <div className={containerClass}>
            <div className="sectionTitle">
                <h1>Extras</h1>
            </div>
            <div className={styles.buttonsContainer}>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.AFC ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => setExtraSection(EXTRA_SECTION.AFC)}
                >
                    AFC
                </Button>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.NFC ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => setExtraSection(EXTRA_SECTION.NFC)}
                >
                    NFC
                </Button>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.PLAYOFFS ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => setExtraSection(EXTRA_SECTION.PLAYOFFS)}
                >
                    Playoffs
                </Button>
            </div>
            {!hasSeasonStarted && <BeforeSeasonStart
                selectedExtraSection={extraSection}
                isBetBlocked={isBetBlocked}
            />}
            {hasSeasonStarted && <AfterSeasonStart selectedExtraSection={extraSection} />}
            {isLoading && <Loading image={logo} style='headbutt' />}
        </div>
    );
}

export default ExtraBets;