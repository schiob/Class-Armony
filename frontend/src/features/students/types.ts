
export interface StudentPayload {
    hasTutor: boolean;
    name: string;
    phone: string;
}

export interface Student extends StudentPayload{
    id: string;
}