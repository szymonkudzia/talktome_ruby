require 'test_helper'

class SendMessageControllerTest < ActionController::TestCase
  test "should get sendMessage" do
    get :sendMessage
    assert_response :success
  end

end
