require 'test_helper'

class GetNewMessagesControllerTest < ActionController::TestCase
  test "should get getNewMessages" do
    get :getNewMessages
    assert_response :success
  end

end
