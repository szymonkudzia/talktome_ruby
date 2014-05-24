require 'test_helper'

class ConfirmFriendControllerTest < ActionController::TestCase
  test "should get confirmFriend" do
    get :confirmFriend
    assert_response :success
  end

end
