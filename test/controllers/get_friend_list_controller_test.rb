require 'test_helper'

class GetFriendListControllerTest < ActionController::TestCase
  test "should get getFriendList" do
    get :getFriendList
    assert_response :success
  end

end
