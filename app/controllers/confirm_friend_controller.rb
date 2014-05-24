class ConfirmFriendController < BaseController
  def confirmFriend
        
        FriendUnconfirmed.delete_all(user_2: params['userId'], user_1: params['friendId'])

        render :json => {}
  end
end
