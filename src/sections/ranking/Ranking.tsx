import React from 'react';
import { isMobile } from "react-device-detect";

import { Ranking as RankingComponent } from 'components_fa/index';

const Ranking = () => {
    return <RankingComponent full={isMobile} />;
}

export default Ranking;