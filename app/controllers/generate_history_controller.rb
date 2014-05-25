require "prawn"
require "CSV"

class GenerateHistoryController < BaseController
	def generate
	    userId = 1 # params['userId']
		friendId = 3 # params['friendId']
		
		respond_to do |format|
			format.pdf do
				send_data generatePdf(userId, friendId)
			end
			format.csv do
				send_data generateCsv(userId, friendId)
			end
		end
	end
	
	def generatePdf(userId, friendId)
		pdf = Prawn::Document.new do

			font "C:\\Windows\\Fonts\\Tahoma.ttf"
			u1 = User.find(userId)
			u2 = User.find(friendId)
			text "Historia dla #{u1.firstName} #{u1.lastName} i #{u2.firstName} #{u2.lastName}", :size => 20, :align => :center
			move_down 30
			
			color1 = '4D4D4D'
			
			m = 7 # margin
			maxw = 350 # max width
		
			messages = Message.where("([to] = ? and [from] = ?) or ([to] = ? and [from] = ?)", userId, friendId, friendId, userId).order(:created_at).each do |msg| 
				
				h = 10 # line height
				
				w = width_of(msg.message, :size => 10) # width
				if w > maxw # trim
					h = (h+1)*((w.to_f/maxw).floor+1)-1
					w = maxw
				elsif width_of(msg.created_at.to_s, :size => 8) > w
					w = width_of(msg.created_at.to_s, :size => 8) 
				end
				
				h += 12 # include the line with the timestamp, final height
				
				
				if(cursor - h <= 0) 
					start_new_page
				end
				
				if(msg.from != userId)
					l = 0 # distance from the left bound
					tc = color1 # text color
					g1 = '48a45c' # gradient colors
					g2 = '70cc66'
				else
					l = bounds.right-w
					tc = 'FFFFFF'
					g1 = '1e5799'
					g2 = '7db9e8'
				end
				
				bounding_box([l,cursor], :width => w, :height => h) do
					stroke_color color1

					stroke do
						fill_gradient [cursor-h-m, cursor-h-m],[cursor-h-m, cursor], g1, g2
						fill_and_stroke_rounded_rectangle [cursor-h-m,cursor+m], w+2*m, h+2*m, m
					end
					
					font_size 10
					text msg.message, :color => tc
					move_down 4
					font_size 8
					text msg.created_at.to_s, :color => tc
					
				end
				move_down 7+2*m
			end
		end
		return pdf.render
	end
	
	def generateCsv(userId, friendId)
		csv = CSV.generate do |csv|
			u1 = User.find(userId)
			u2 = User.find(friendId)
			u1 = u1.firstName + " " + u1.lastName
			u2 = u2.firstName + " " + u2.lastName
			
			messages = Message.where("([to] = ? and [from] = ?) or ([to] = ? and [from] = ?)", userId, friendId, friendId, userId).order(:created_at).each do |msg| 
				csv << [
					msg.from == userId ? u1 : u2,
					msg.created_at.to_s,
					msg.message
				]
			end
		end
		return csv
	end
end
