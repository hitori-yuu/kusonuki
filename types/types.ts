export interface UserData {
    id: string;
    displayName: string;
    pictureUrl:  string;
    role: string;
    studentName: string;
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

export interface AssignmentData {
    id: number;
    name: string;
    subject:  string;
    deadline: Date;
    grade: number;
    group: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}