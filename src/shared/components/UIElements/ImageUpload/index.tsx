import React, { useRef, useState, useEffect } from 'react'

import Button from '../Button'
import styles from './style.module.scss'

interface IImageUpload {
    id: string
    center?: boolean
    onInput: (id: string, file: any, isValid: boolean) => void,
    errorText: string
}

const ImageUpload: React.FC<IImageUpload> = ({ id, center, onInput, errorText }) => {

    const [file, setFile] = useState<File>()
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>()
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])


    const filePickerRef = useRef<HTMLInputElement>(null)
    const onUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile;
        let fileIsValid = isValid
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true

        } else {
            setIsValid(false)
            fileIsValid = false
        }
        onInput(id, pickedFile, fileIsValid)
    }
    const pickImageHandler = () => {
        filePickerRef.current?.click()
    }

    return (
        <div className={styles.formControl}>
            <input onChange={onUploadHandler} ref={filePickerRef} id={id} type="file" accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
            <div className={`${styles.imageUpload} ${center && 'center'}`}>
                <div className={styles.imageUpload__preview}>
                    {typeof previewUrl === 'string' && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler} >PICK IMAGE</Button>
            </div>
            {!isValid && <p>{errorText}</p>}
        </div>
    )
}

export default ImageUpload;
