require 'test_helper'

class ChangeProfilePictureControllerTest < ActionController::TestCase
  test "should get changeProfilePicture" do
    get :changeProfilePicture
    assert_response :success
  end

end
