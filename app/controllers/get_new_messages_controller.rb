class GetNewMessagesController < BaseController
  def getNewMessages
  		userId = params['userId']
        
        messages = []
        NewMessage.where(to: userId).order(:dateInserted).each do |m|
        	message = m.attributes
            message['date'] = message['dateInserted'].strftime("%Y-%m-%d %H:%M:%S")
            messages.append(message)

            NewMessage.delete(message['id'])
		    end

        render :json => messages
  end
end
