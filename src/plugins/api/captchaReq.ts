import axios from './../axios'

export const genCaptcha = (): Promise<void> => {

    return axios.post('/captcha/gen', {})

}

export const validateCaptcha = (id: String, sliderCaptchaTrack: Object): Promise<void> => {

    return axios.post('/captcha/valid', {
        id,
        track: { ...sliderCaptchaTrack }
    })

}
