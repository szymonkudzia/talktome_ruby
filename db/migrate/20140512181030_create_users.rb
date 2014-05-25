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
		t.string :salt

      t.timestamps
    end

    execute "INSERT INTO users
                (email, password, country, firstName, lastName, 'birthdate', 'salt')
             VALUES
                ('admin1@ttm.com', '848164e98f64174be3c51822aa1c2c41f71e07ad', 'pl-pl', 'Brad', 'Pit', '1990-12-31', 'test'),
                ('admin2@ttm.com', '98cb97f4da3d9ca4657fa2f725b57ff4f12bb590', 'en-us', 'Angelina', 'Jole', '1990-12-31', 'test'),
                ('admin3@ttm.com', '65f442e7bc411ce7173b64e1eda473a94202877d', 'pl-pl', 'Jozin', 'Z Bazin', '1990-12-31', 'test');"

  end
end
