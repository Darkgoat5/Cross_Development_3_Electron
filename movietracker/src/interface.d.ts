interface Window {
  api: {
    /** Set the listener for the reply from the main process */
    ipcReceiveReplyFromMain: (channel: string, listener: (event: any, ...arg:
    any) => void) => void;
    /** Get the Electron version */
    getElectronVersion: () => string;

    saveMovies: (movies: any[]) => Promise<void>;
    loadMovies: () => Promise<any[]>;
  };
}