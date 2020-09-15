import React, { Fragment, useState } from 'react'
import { Modal } from 'antd'
import axios from 'axios'
import './UploadImage.less'
import {
    EyeOutlined,
    DeleteOutlined,
    DownloadOutlined,
    LoadingOutlined,
    CloseCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons'

const UploadImage = ({
    action = '',
    list = [],
    onPreview = () => {},
    onDelete = () => {},
    onDownload = () => {},
    onUpload = () => {},
}) => {
    const [previewSrc, setPreviewSrc] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [uploadErrorFileName, setUploadErrorFileName] = useState(null)

    return (
        <Fragment>
            <div className="upload-image">
                <div className="image-list">
                    {list.map((item) => (
                        <div key={item.id} className="image-item">
                            <img className="item" src={item.src} alt="" />
                            <div className="config item">
                                <EyeOutlined
                                    className="icon"
                                    onClick={() => previewImage(item, setPreviewSrc, onPreview)}
                                />
                                <DeleteOutlined className="icon" onClick={() => onDelete(item)} />
                                <DownloadOutlined
                                    className="icon"
                                    onClick={() => downloadImage(item, onDownload)}
                                />
                                <a id="download-image" download={item.name} href="javascript">
                                    {' '}
                                </a>
                            </div>
                        </div>
                    ))}
                    {uploadLoading && renderUploading()}
                    {uploadErrorFileName &&
                        renderUploadError(uploadErrorFileName, setUploadErrorFileName)}
                    <div className="upload-container item">
                        <PlusOutlined />
                        <div className="name">Upload</div>
                        <input
                            type="file"
                            id="upload-image"
                            name="image"
                            accept="image/*"
                            onChange={() =>
                                handleUploadImage(
                                    list,
                                    action,
                                    onUpload,
                                    setUploadLoading,
                                    setUploadErrorFileName
                                )
                            }
                        />
                    </div>
                </div>
            </div>
            <Modal
                width={800}
                className="preview-modal"
                visible={previewSrc !== null}
                title={null}
                footer={null}
                onCancel={() => setPreviewSrc(null)}
            >
                <img src={previewSrc} alt="" />
            </Modal>
        </Fragment>
    )
}

const renderUploading = () => (
    <div className="uploading item">
        <LoadingOutlined />
        <span>Uploading...</span>
    </div>
)

const renderUploadError = (uploadErrorFileName, setUploadErrorFileName) => (
    <div className="uploading item error">
        <CloseCircleOutlined className="icon" />
        <div className="error-message">Error!</div>
        <div className="name">{uploadErrorFileName}</div>
        <div className="config item">
            <DeleteOutlined onClick={() => setUploadErrorFileName(null)}></DeleteOutlined>
        </div>
    </div>
)

const previewImage = (item, setPreviewSrc, onPreview) => {
    setPreviewSrc(item.src)
    onPreview(item)
}

const downloadImage = (item, onDownload) => {
    const target = document.getElementById('download-image')
    const blob = new Blob([item.src])
    target.href = URL.createObjectURL(blob)
    target.click()
    onDownload(item)
}

const handleUploadImage = async (
    list,
    action,
    uploadImage,
    setUploadLoading,
    setUploadErrorFileName
) => {
    const input = document.getElementById('upload-image')
    const targetFile = input.files[0]
    if (targetFile) {
        setUploadLoading(true)
        const { name } = targetFile
        const imageBase64 = await getBase64(targetFile)
        await axios
            .post(action, { imageBase64, name })
            .then(() => {
                uploadImage(action + '/' + name)
            })
            .catch(() => {
                setUploadErrorFileName(name)
            })
        setUploadLoading(false)
    }
}

const getBase64 = (file) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    return new Promise((resolve) => {
        fileReader.onload = (data) => {
            resolve(data.target.result)
        }
    })
}

export default UploadImage
