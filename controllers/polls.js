const db = require("../models");


const index = (req, res) => {
    db.Poll.find({}).populate("author").exec((err, foundPolls) => {
        if (err) console.log('Error in Polls#index:', err)
        if(!foundPolls) return res.json({
            message: 'No Polls found in database.'
        })
        console.log(foundPolls)
        res.status(200).json({ Polls: foundPolls });
    })
}


const show = (req, res) => {
    db.Poll.findById(req.params.id, (err, foundPoll) => {
        if (err) console.log('Error in Polls#show:', err);
        res.send("Incomplete Polls#show controller function");
        res.json({ poll: foundPoll })
        console.log(res.json())
    });
};


const vote = (req, res) => {
    db.Poll.findById(req.params.id, (err, foundPoll) => {
        if (err) console.log('poll does not show', err);
        console.log({ foundPoll })
        foundPoll.response.push(req.body)
        foundPoll.save(err => {
            res.json(foundPoll)
        })
    })
}

const voteyes = (req, res) => {
    console.log(req.params.id)
    db.Poll.findById(req.params.id, (err, foundPoll) => {
        if (err) console.log('poll does not show', err);
        console.log(err)
        console.log( foundPoll )
        console.log(foundPoll.yes)
        foundPoll.yes = foundPoll.yes + 1
        foundPoll.save(err => {
            res.json(foundPoll)
        })
    })
}

const voteno = (req, res) => {
    db.Poll.findById(req.params.id, (err, foundPoll) => {
        if (err) console.log('poll does not show', err);
        console.log( foundPoll )
        console.log(foundPoll.no)
        foundPoll.no = foundPoll.no + 1
        foundPoll.save(err => {
            res.json(foundPoll)
        })
    })
}


const create = (req, res) => {
    console.log('================', req.body)
    db.Poll.create(req.body, (err, savedPoll) => {
        if (err && err.code === 11000) {
            res.status(500).json({ error: 'You have already asked this question'})
        } else if (err) {console.log('Error in polls#create:', err)}
        db.User.findById(req.body.author, (err, foundUser) => {
            console.log(savedPoll)
            foundUser.polls.push(savedPoll._id)
            foundUser.save()
        })
    })
    res.status(201).json({ message: 'successful!' })
}


const update = (req, res) => {
    db.Poll.response.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPoll) => {
        if (err) console.log('Error in Polls#update:', err);
        res.send("Incomplete polls#update controller function");
    });
};


const destroy = (req, res) => {
    db.Poll.findByIdAndDelete(req.params.id, (err, deletedPoll) => {
        if (err) console.log('Error in Polls#destroy:', err);
        res.send("Incomplete polls#destroy controller function");
    });
};
module.exports = {
    index,
    show,
    create,
    vote,
    update,
    destroy,
    voteyes,
    voteno,
};