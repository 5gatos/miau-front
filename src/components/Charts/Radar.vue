<script>
import { Radar } from 'vue-chartjs'

export default {
  extends: Radar,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      labels: ['Económico', 'Ambiental', 'Social'],
      datasets: [
        {
          label: 'BAU',
          backgroundColor: 'rgba(149, 117, 205, 0.3)',
          borderColor: 'rgba(103, 58, 183, 0.5)',
          pointBackgroundColor: 'rgba(101, 73, 156, 0.5)',
          data: [100, 60, 40]
        }
      ]
    },{
      responsive: true,
      maintainAspectRatio: true,
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100
        }
      }
    })
  }
}
</script>

<style>
</style>
