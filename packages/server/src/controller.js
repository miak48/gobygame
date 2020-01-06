const Result = require('./result');

createResult = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Womp!',
        })
    }

    console.log('createResult', body);

    const model = new Result(body);

    if (!model) {
        return res.status(400).json({ success: false, error: 'womp' })
    }

    model
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: model._id,
                message: 'Result created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Result not created!',
            })
        })
};

getResultById = async (req, res) => {
    await Result.findOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!result) {
            return res
                .status(404)
                .json({ success: false, error: `Result not found` })
        }
        return res.status(200).json({ success: true, data: result })
    }).catch(err => console.log(err))
};

getResults = async (req, res) => {
    await Result.find({}, (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!results.length) {
            return res
                .status(404)
                .json({ success: false, error: `Result not found` })
        }
        return res.status(200).json({ success: true, data: results })
    }).catch(err => console.log(err))
};

module.exports = {
    createResult,
    getResultById,
    getResults,
};
