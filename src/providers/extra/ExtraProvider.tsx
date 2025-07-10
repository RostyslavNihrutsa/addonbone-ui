import React, {FC, PropsWithChildren} from "react";

import {ExtraContext} from "./context";

import {Config} from "../../types/config";

const ExtraProvider: FC<PropsWithChildren<Pick<Config, "extra">>> = ({children, extra}) => {
    return <ExtraContext.Provider value={{extra}}>{children}</ExtraContext.Provider>;
};

ExtraProvider.displayName = "ExtraProvider";

export default ExtraProvider;
