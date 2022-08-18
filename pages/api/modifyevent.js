// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Event from "../../models/Event"
import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    try {
        if (req.method == 'PATCH') {
            // console.log(req.body);
            let user;
            if (req.body.token) {
                var t = jwt.verify(req.body.token, process.env.JWT_SECRET)
                user = await User.findOne({ email: t.email })
            }
            const event = await Event.findOne({eventId: req.body.eventId})
            if(event && req.body.admin && user){
                event.event_name = req.body.name
                event.start_time = req.body.stime
                event.end_time = req.body.etime
                event.event_desc = req.body.desc
                event.location = req.body.location
                event.image = req.body.img
                event.capacity = req.body.capacity
                const updatedEvent = await Event.findOneAndUpdate({eventId: event.eventId}, event);
                res.status(200).json({ success: true })
            }
            else if(event && !req.body.admin && user){
                event.capacity = event.capacity-1
                let token = jwt.sign({user:user._id,eventId:event.eventId},process.env.JWT_SECRET)
                user.events.push({eventId:event.eventId,event_name:event.event_name,event_desc:event.event_desc,start_time:event.start_time,end_time:event.end_time,location:event.location,image:event.image})

                const updateduser = await User.findOneAndUpdate({email:user.email},user)
                const u = await User.findOne({email:user.email})
                let e = u.events;
                const updatedEvent = await Event.findOneAndUpdate({eventId: event.eventId}, event);
                res.status(200).json({ success: true , capacity: updatedEvent.capacity ,token,regEve:e})
            }
        }
        else {
            res.status(400).json({ success: false, error: "This method is not allowed" })
        }
    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}
export default connectDb(handler)