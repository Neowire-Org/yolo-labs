export type RegistrationDto = {
    nameFirst: string,
    nameLast: string,
    email: string,
    password: string,
    dob: Date,
    privacyOptin: boolean, 
    marketingOptin: boolean | null
}
// Path: src\components\registration-form.tsx   