export interface UserData {
    id: string;
    displayName: string;
    pictureUrl:  string;
    role: string;
    isLinked: boolean;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface StudentData {
    name: string;
    lastName: string;
    firstName: string;
    grade: number;
    group: number;
    number: number;
    firstGroup: string;
    secondGroup: string;
    thirdGroup: string;
    firstNumber: number;
    secondNumber: number;
    thirdNumber: number;
    isLinked: boolean;
    isAvailable: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}