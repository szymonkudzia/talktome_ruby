class DeleteFriendController < BaseController
  def deleteFriend

	Friend.delete_all(user_1: params['userId'], user_2: params['friendId'])
	Friend.delete_all(user_1: params['friendId'], user_2: params['userId'])

	render :json => {}
  end
end
