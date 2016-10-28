// Get current year, month and day

list($iThisYear, $iThisMonth, $iThisDay) = explode('-', date('Y-m-d'));

// Get current year and month depending on possible GET parameters

if (isset($_GET['month'])) {

list($iMonth, $iYear) = explode('-', $_GET['month']);

$iMonth = (int)$iMonth;

$iYear = (int)$iYear;
} else {

list($iMonth, $iYear) = explode('-', date('n-Y'));

}

// Get name and number of days of specified month

$iTimestamp = mktime(0, 0, 0, $iMonth, $iThisDay, $iYear);

list($sMonth_Name, $iDays_In_Month) = explode('-', date('F-t', $iTimestamp));

// Get previous year and month

$iPrev_Year = $iYear;

$iPrev_Month = $iMonth - 1;

if ($iPrev_Month <= 0) {

$iPrev_Year--;

$iPrev_Month = 12; // set to December

}

// Get next year and month

$iNext_Year = $iYear;

$iNext_Month = $iMonth + 1;

if ($iNext_Month > 12) {

$iNext_Year++;

$iNext_Month = 1;

}

// Get number of days of previous month

$iPrevDays_In_Month = (int)date('t', mktime(0, 0, 0, $iPrev_Month, $iThisDay, $iPrev_Year));

// Get numeric representation of the day of the week of the first day of specified (current) month

$iFirst_Day = (int)date('w', mktime(0, 0, 0, $iMonth, 1, $iYear));

// On what day the previous month begins

$iShow_Prev_From = $iPrevDays_In_Month - $iFirst_Day + 1;

// If previous month

$bPrevious_Month = ($iFirst_Day > 0);

// Initial day

$iCurrent_Day = ($bPrevious_Month) ? $iShow_Prev_From : 1;

$bNext_Month = false;

$sCalTblRows = '';

// Generate rows for the calendar

for ($i = 0; $i < 6; $i++) { // 6-weeks range

$sCalTblRows .= '<tr>';

for ($j = 0; $j < 7; $j++) { // 7 days a week

$sClass = '';

if ($iThisYear == $iYear && $iThisMonth == $iMonth && $iThisDay == $iCurrent_Day && !$bPrevious_Month && !$bNext_Month) {

$sClass = 'today';

} elseif (!$bPrevious_Month && !$bNext_Month) {

$sClass = 'current';

}

$sCalTblRows .= '<td class="'.$sClass.'"><a href="javascript: void(0)">'.$iCurrent_Day.'</a></td>';

// Next day

$iCurrent_Day++;

if ($bPrevious_Month && $iCurrent_Day > $iPrevDays_In_Month) {

$bPrevious_Month = false;

$iCurrent_Day = 1;

}

if (!$bPrevious_Month && !$bNext_Month && $iCurrent_Day > $iDays_In_Month) {

$bNext_Month = true;

$iCurrent_Day = 1;

}

}

$sCalTblRows .= '</tr>';

}

// Prepare replacement keys and generate the calendar

$aKeys = array(

'__prev_month__' => "{$iPrev_Month}-{$iPrev_Year}",

'__next_month__' => "{$iNext_Month}-{$iNext_Year}",

'__cal_caption__' => $sMonth_Name . ', ' . $iYear,

'__cal_rows__' => $sCalTblRows,

);

$sCalendarItself = strtr(file_get_contents('/calendar.html'), $aKeys);

// AJAX requests - return the calendar

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' && isset($_GET['month'])) {

header('Content-Type: text/html; charset=utf-8');

echo $sCalendarItself;

exit;

}

$aVariables = array(

'__calendar__' => $sCalendarItself,

);

echo strtr(file_get_contents('/test.html'), $aVariables);

