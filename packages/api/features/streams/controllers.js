const dal = require('./dal')

const create = async (req, res) => {
    try {
        const {
            file,
            body: { name },
            decoded: user,
        } = req
        console.log('file', file)
        const response = await dal.createStream(name, file.filename, user._id)
        console.log('response', response)
        res.json(response)
    } catch (error) {
        console.log('error', error)
        res.error({ message: error.toString() })
    }
}

const update = async (req, res) => {
    try {
        const {
            file,
            body: { name, streamKey, isDisabled },
            params: { id },
        } = req
        const payload = { id, name, streamKey, isDisabled }
        if (file) {
            payload.posterPath = file.filename
        }
        const response = await dal.updateStream(payload)
        res.json(response)
    } catch (error) {
        console.log('error', error)
        res.error({ message: error.toString() })
    }
}

const getAll = async (req, res) => {
    try {
        const list = await dal.getAllLive()
        res.json(list)
    } catch (error) {
        console.log('error', error)
        res.error({ message: error.toString() })
    }
}

const getStreamData = async (req, res) => {
    try {
        const { id } = req.params
        const stream = await dal.getStream(id)
        res.json(stream[0])
    } catch (error) {
        console.log('error', error)
        res.error({ message: error.toString() })
    }
}

const changeLive = async (streamKey, isLive) => {
    try {
        const stream = await dal.changeLive({ streamKey, isLive })
        return stream
    } catch (error) {
        console.log(error)
    }
}

const getStreamByKey = async (streamKey) => {
    try {
        const stream = await dal.getStreamByKey(streamKey)
        return stream
    } catch (error) {
        console.log(error)
    }
}

const deleteStream = async (req, res) => {
    try {
        const { id } = req.params
        await dal.deleteStream(id)
        res.json({ message: 'success' })
    } catch (error) {
        console.log('error', error)
        res.error({ message: error.toString() })
    }
}

module.exports = {
    create,
    getAll,
    getStreamData,
    changeLive,
    getStreamByKey,
    deleteStream,
    update,
}
