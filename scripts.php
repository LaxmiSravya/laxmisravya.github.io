<?php


 
if(isset($_POST['year']) && !empty($_POST['year'])){
	getCalender($_POST['year'],$_POST['month']);
}

 // Get calendar full HTML
function getCalender($year = '',$month = '')
{
	$date_Year = ($year != '')?$year:date("Y");
	$date_Month = ($month != '')?$month:date("m");
	$date = $date_Year.'-'.$date_Month.'-01';
	$First_Day = date("N",strtotime($date));
	$total_Days = cal_days_in_month(CAL_GREGORIAN,$date_Month,$date_Year);
	$calendar_display = ($First_Day == 7)?($total_Days):($total_Days + $First_Day);
	$cDisplay = ($calendar_display <= 35)?35:42;
?>
<div id="calender_section">

  <div class="nav">
        <a class="pre" href="javascript:void(0);" onclick="getCalendar('<?php echo date("Y",strtotime($date.' - 1 Month')); ?>','<?php echo date("m",strtotime($date.' - 1 Month')); ?>');">
            <?php echo date("F",strtotime($date.' - 1 Month')); ?>
        </a>
        <div class="head">
            <select name="month_dropdown" class="month_dropdown dropdown"> <?php echo get_AllMonths($date_Month); ?> </select>
            <select name="year_dropdown" class="year_dropdown dropdown">   <?php echo get_YearList($date_Year); ?>   </select>
        </div>
        <a class="next" href="javascript:void(0);" onclick="getCalendar('<?php echo date("Y",strtotime($date.' + 1 Month')); ?>','<?php echo date("m",strtotime($date.' + 1 Month')); ?>');">
            <?php echo date("F",strtotime($date.' + 1 Month')); ?>
        </a>
    </div> 


    <div id="calender_section_top">
        <ul>
            <li>SUN</li>
			<li>MON</li>
			<li>TUE</li> 
			<li>WED</li>
			<li>THUR</li>
			<li>FRI</li>
			<li>SAT</li>
        </ul>
    </div>
    <div id="calender_section_bot">
        <ul>
            <?php
    $day_Count = 1;
    for($i=1;$i<=$cDisplay;$i++){
        if(($i >= $First_Day+1 || $First_Day == 7) && $i <= ($calendar_display)){
            //Current date
            $cur_Date = $date_Year.'-'.$date_Month.'-'.$day_Count;

            //Define date cell color
            if(strtotime($cur_Date) == strtotime(date("Y-m-d"))){
                echo '<li date="'.$cur_Date.'" class="aqua">';
            }else{
                echo '<li date="'.$cur_Date.'" class="date_cell">';
            }
            //Date cell
            echo '<span>';
            echo $day_Count;
            echo '</span>';

            echo '</li>';
            $day_Count++;
            ?>
            <?php }
        else{ ?>
            <li>
                <span>&nbsp;</span>
            </li>
            <?php }
    } ?>
        </ul>
    </div>
</div>

<script type="text/javascript">
    function getCalendar(year, month) {
        $.ajax({
            type: 'POST',
            url: 'scripts.php',
            data: 'year=' + year + '&month=' + month,
            success: function (html) {
                $('#calendar_div').html(html);
            }
        });
    }

    $(document).ready(function () {
        $('.month_dropdown').on('change', function () {
            getCalendar($('.year_dropdown').val(), $('.month_dropdown').val());
        });
        $('.year_dropdown').on('change', function () {
            getCalendar($('.year_dropdown').val(), $('.month_dropdown').val());
        });
    });
</script>
<?php
}

//Get months options list.
function get_AllMonths($selected = ''){
	$options = '';
	for($i=1;$i<=12;$i++)
	{
		$value = ($i < 10)?'0'.$i:$i;
		$selected_Opt = ($value == $selected)?'selected':'';
		$options .= '<option value="'.$value.'" '.$selected_Opt.' >'.date("F", mktime(0, 0, 0, $i+1, 0, 0)).'</option>';
	}
	return $options;
}
 // Get years options list.
function get_YearList($selected = ''){
	$options = '';
	for($i=1900;$i<=2100;$i++)
	{
		$selected_Opt = ($i == $selected)?'selected':'';
		$options .= '<option value="'.$i.'" '.$selected_Opt.' >'.$i.'</option>';
	}
	return $options;
}

?>