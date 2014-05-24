class AddFriendController < BaseController
  def addFriend
    Friend.new do |f|
    	f.user_1 = params['userId']
    	f.user_2 = params['friendId']

    	f.save
    end

    FriendUnconfirmed.new do |f|
    	f.user_1 = params['userId']
    	f.user_2 = params['friendId']

    	f.save
    end

    render :json => {}
  end
end
