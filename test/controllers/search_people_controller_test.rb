require 'test_helper'

class SearchPeopleControllerTest < ActionController::TestCase
  test "should get searchPeople" do
    get :searchPeople
    assert_response :success
  end

end
