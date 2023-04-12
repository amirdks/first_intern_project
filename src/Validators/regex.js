const testEmail = (value) => {
    const emailPattent = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return emailPattent.test(value)
}

const testCodeMelli = (value) => {
    // Test
}

const testPhoneNumber = (value) => {
    // Test
}

export default {
    testEmail,
    testCodeMelli,
    testPhoneNumber
}