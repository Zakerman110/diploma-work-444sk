export interface Flow {
    id: number,
    start_date: string,
    end_date: string,
    description: string,
    status: string,
    from_country: string,
    to_country: string,
    user: string,
    flowdetails_set: FlowDetails[]
}

export interface FlowDetails {
    id: number,
    age: number,
    income: number,
    gender: number,
    education: number,
    occupation: number,
}

export interface FlowDetailsCsv {
    id: number,
    age: number,
    income: number,
    gender: string,
    education: string,
    occupation: string,
    flow: number
}

export interface FlowNew {
    start_date: string,
    end_date: string,
    description: string,
    from_country: number,
    to_country: number,
    flowdetails_set: FlowDetailsNew[]
}

export interface FlowDetailsNew {
    age: number,
    income: number,
    gender: number,
    education: number,
    occupation: number,
}

export interface FlowDetailsValue {
    id: number,
    name: number
}

export interface UpdateFlowStatus {
    id: number,
    status: number
}