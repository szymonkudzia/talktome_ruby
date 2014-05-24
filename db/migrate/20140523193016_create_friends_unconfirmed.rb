class CreateFriendsUnconfirmed < ActiveRecord::Migration
  def change
    create_table :friends_unconfirmed do |t|
      t.integer :user_1
      t.integer :user_2
      t.timestamps
    end
  end
end
