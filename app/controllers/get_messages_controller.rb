class GetMessagesController < BaseController
	def getMessages
        ids = [params['userId'], params['friendId']]

        messages = []
        Message.where(:from => ids, :to => ids).each do |message|
            if !NewMessage.where(id: message.id).first
            	m = message.attributes
            	m['date'] = m['dateInserted'].strftime("%Y-%m-%d %H:%M:%S")
	            messages.append(m)
			end
		end

        render :json => messages
	end

end
