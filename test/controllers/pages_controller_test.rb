require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get resume" do
    get :resume
    assert_response :success
  end

  test "should get consulting" do
    get :consulting
    assert_response :success
  end

  test "should get contact" do
    get :contact
    assert_response :success
  end

  test "should get blog" do
    get :blog
    assert_response :success
  end

end
