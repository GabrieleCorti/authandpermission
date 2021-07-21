const Step = (srt:string) => {
    const ValidEmail = new RegExp(srt);
    
    return ValidEmail;
}

export default Step;