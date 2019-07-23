
# bananas also have an is_yummy property which defaults to true, because all bananas are yummy 
# all bananas have the ability to rot, which toggles isYummy to false
# you should use attr_accessor

class Banana
  attr_accessor :color, :length, :diameter, :is_yummy

  def initialize(color = "yellow", length, diameter, is_yummy: true)
    @color = color
    @length = length
    @diameter = diameter
    @is_yummy = !!is_yummy 
  end

  def show_stuff
    puts @color
    puts @length
    puts @diameter
    puts @is_yummy
  end



end

manana = Banana.new("7 inches","half inch")

manana.show_stuff