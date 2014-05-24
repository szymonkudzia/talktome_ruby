class CreateNewMessages < ActiveRecord::Migration
  def change
    create_table :new_messages do |t|
	  t.integer :from
      t.integer :to
      t.string  :message
      t.datetime :dateInserted, :default => Time.now

      t.timestamps
    end
  end
end
