import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Layout } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import style from './StreamSettingsPage.module.scss'
import { getStreamDataApi, deleteStream } from '../../api/stream'
const StreamSettingsPage = () => {
    const { id } = useParams()
    const history = useHistory()
    const [streamData, setStreamData] = useState()

    const getStreamData = async () => {
        const response = await getStreamDataApi(id)
        setStreamData(response.data)
    }

    const handleDeleteStream = async () => {
        const response = await deleteStream(id)
        history.push('/streaming')
    }

    useEffect(() => {
        getStreamData()
    }, [])
    if (!streamData) return null
    return (
        <Layout.Content style={{ padding: 50 }}>
            <Row gutter={['0', '20']}>
                <Col span="3">
                    <p className={style.title}>Stream name:</p>
                </Col>
                <Col span="6">
                    <p className={style.title}>{streamData.name}</p>
                </Col>
            </Row>

            <Row gutter={['0', '20']}>
                <Col span="3">
                    <p className={style.title}>Stream key:</p>
                </Col>
                <Col span="6">
                    <p className={style.streamKey}>{streamData.streamKey}</p>
                </Col>
            </Row>

            <Row gutter={['0', '20']}>
                <Col span="3">
                    <Button onClick={handleDeleteStream} type="danger">
                        Delete stream
                    </Button>
                </Col>
            </Row>
        </Layout.Content>
    )
}

export default StreamSettingsPage
