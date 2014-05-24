require 'test_helper'

class AddFriendControllerTest < ActionController::TestCase
  test "should get addFriend" do
    get :addFriend
    assert_response :success
  end

end
