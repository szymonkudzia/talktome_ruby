class CreateUserNotConfirmed < ActiveRecord::Migration
  def change
    create_table :users_not_confirmed do |t|
  		t.integer :userId
  		t.string :code
  		t.datetime :dateInserted, :default => Time.now

      t.timestamps
    end
  end
end
