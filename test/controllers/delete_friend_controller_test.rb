require 'test_helper'

class DeleteFriendControllerTest < ActionController::TestCase
  test "should get deleteFriend" do
    get :deleteFriend
    assert_response :success
  end

end
