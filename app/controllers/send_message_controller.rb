class SendMessageController < BaseController
  def sendMessage
  		data = params

  		newMessage = NewMessage.new do |m|
	  		m.from = params['userId']
	  		m.to = params['friendId']
	  		m.message = params['message']

	  		m.save
	  	end

        message = Message.new do |m|
	        m.id = newMessage.id
	        m.from = newMessage.from
	        m.to = newMessage.to
	        m.dateInserted = newMessage.dateInserted
	        m.message = newMessage.message

	        m.save
		end

        render :json => newMessage
  end
end
