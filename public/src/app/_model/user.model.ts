import { Course } from "./course.model";

export class User {
    _id: string; // mongo id
    em: string; // email
    pw: string; // password
    fn: string; // firstname
    ln: string; // lastname
    c: Array<Course>; // courses
}