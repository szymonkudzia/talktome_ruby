class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
  		t.string :email, :unique => true
  		t.string :password
  		t.string :country
  		t.date	:birthdate
  		t.string :firstName
  		t.string :lastName
  		t.string :profilePicture, :default => 'html/img/noProfilePicture.png'
  		t.integer :men, :default => 1
  		t.integer :women, :default => 1
  		t.integer :sex, :default => 1
  		t.string :aboutMe
  		t.string :telephone
  		t.string :facebook
  		t.string :googlep

      t.timestamps
    end
  end
end
