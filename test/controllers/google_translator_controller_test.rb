require 'test_helper'

class GoogleTranslatorControllerTest < ActionController::TestCase
  test "should get googleTranslator" do
    get :googleTranslator
    assert_response :success
  end

end
