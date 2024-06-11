export type ProcessAction = {
    message: string,
    iserror: boolean
};

export type DataCsv = {
    data: Array<Record<string,string>>,
    message: string,
    iserror: boolean
};

export type DataFile = {
    csvFile : File | undefined,
    fileid: string | undefined
}

export type Modal = {
    dialog : boolean,
    action : string,
    message: string,
    actionDisabled: boolean
}