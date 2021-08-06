import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import RecordsTable from './components/RecordsTable';
import { LargeButton } from 'components/index';

// Actions
import { fetchRecords } from 'store/records/actions';

// Selectors
import { selectRecords } from 'store/records/selector';
import { selectUser } from 'store/user/selector';

// Types
import { TRecordFilter } from './types';

import { defaultButtons, defaultFilter } from 'constants/records';
import ROUTES from 'constants/routes';
import styles from './style.module.scss';

const Records = () => {
    const [filter, setFilter] = useState<TRecordFilter>(defaultFilter);
    const records = useSelector(selectRecords);
    const loggedUser = useSelector(selectUser);

    const dispatch = useDispatch();
    const { recordsParam, weekParam } = useParams<{ recordsParam: string, weekParam: string }>();

    useEffect(() => {
        if (filter.id !== null) {
            const { accumulated, orderBy, sortAsc, limit, season, week, userId } = filter;
            dispatch(fetchRecords(
                accumulated,
                orderBy,
                sortAsc,
                limit,
                season,
                week,
                filter.needsLoggedUser && loggedUser ? loggedUser.id : userId
            ));
        }
    }, [dispatch, filter]);

    useEffect(() => {
        const selectedButton = defaultButtons.find((button) => button.route === recordsParam);
        if (selectedButton === undefined || (selectedButton.needsLoggedUser && !loggedUser)) {
            setFilter(defaultFilter);
        } else {
            setFilter({
                ...selectedButton,
                week: weekParam !== undefined
                    ? parseInt(weekParam)
                    : selectedButton.week
            });
        }
    }, [defaultButtons, recordsParam, loggedUser, weekParam]);

    const renderButtons = () => {
        return defaultButtons.map((button) => {
            if (button.needsLoggedUser && !loggedUser) {
                return null;
            }

            return (
                <LargeButton
                    key={button.id}
                    display={button.display}
                    description={button.description}
                    route={weekParam !== undefined
                        ? ROUTES.RECORDS.urlWithParams(button.route, weekParam)
                        : ROUTES.RECORDS.urlWithParams(button.route)}
                    onClick={() => setFilter(button)}
                />
            );
        })
    };

    const renderTitle = () => {
        if (filter.id === null) {
            return (
                <div className="sectionTitle">
                    <h1>Records</h1>
                </div>
            );
        }

        return (
            <Link to={ROUTES.RECORDS.url}>
                <div className="sectionTitleLink" onClick={() => setFilter(defaultFilter)}>
                    <h1>Records</h1>
                </div>
            </Link>
        );
    };

    return (
        <div className={styles.container}>
            {renderTitle()}
            {filter.id === null && <div className={styles.buttonsContainer}>
                {renderButtons()}
            </div>}
            {filter.id !== null && <RecordsTable filter={filter} records={records} />}
        </div>
    )
}

export default Records;
