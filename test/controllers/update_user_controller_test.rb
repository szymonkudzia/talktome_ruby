require 'test_helper'

class UpdateUserControllerTest < ActionController::TestCase
  test "should get updateUser" do
    get :updateUser
    assert_response :success
  end

end
