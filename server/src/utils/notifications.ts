import Notification from "../models/notification.models";



interface NotificationTypes{
    userId: string | undefined;
    title: string;
    message: string;
    type: "payment"|"booking"|"system"|"promotion";
    bookingId: string;
   
}

export const bookingNotification = async ({userId,
title,
message,
type,
bookingId}:NotificationTypes) => {
   await Notification.create(
        {userId,title,message,type,bookingId}
   )
    return true
}