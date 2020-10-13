import React from "react";

export interface LoadingProcess {
  name: string;
  isReady: boolean;
}

interface Props {
  /**
   * A collection of process that should be ready before displaying the application
   *
   * @type {LoadingProcess[]}
   * @memberof Props
   */
  mandatoryProcesses?: LoadingProcess[];
  /**
   * Can be a splashscreen or whatever
   *
   * @type {React.ReactElement}
   * @memberof Props
   */
  loadingComponent: React.ReactElement;
}

/**
 * A component used to display a loading while some processes are loading.
 */
export const AppLoader: React.FC<Props> = React.memo((props) => {
  return (
    <React.Fragment>
      {props.mandatoryProcesses?.every(
        (mandatory) => mandatory.isReady === true
      )
        ? props.children
        : props.loadingComponent}
    </React.Fragment>
  );
});
