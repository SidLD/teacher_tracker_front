import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};
const getRandomNumber = (maxNum) => {
    return Math.floor(Math.random() * maxNum);
  };
const getRandomColor = () => {
    const r = getRandomNumber(255);
    const g = getRandomNumber(255);
    const b = getRandomNumber(255);
    return `rgb(${r}, ${g}, ${b})`;
  };

export const CustomeVerticalChart = ({props}) => {
    let bgColors = []
    const {categories, batches, dataSource} = props
    const source = []
    // console.log(categories)
    // console.log(batches)
    // console.log(dataSource)
    
    //Helpe Arrange Data for Graphs
    categories.forEach(categoryElement => {
      // console.log(categoryElement)
      let userCountsWithBatch = []
      batches.forEach(batchElement => {
        // console.log(batchElement)
        dataSource.forEach(dataElement => {
          if(categoryElement === dataElement.category){
            dataElement.batchCounts.forEach(counts => {
              if(counts.batch === batchElement){
                userCountsWithBatch.push(counts.count)
              }
            })
          }
        })
      })
      source.push({
        category: categoryElement,
        batchCounts: userCountsWithBatch
      })
    });
    // console.log(source)
    
    for(let i = 0; i < categories.length; i++){
        bgColors.push(getRandomColor())
    }
    const data = {
        labels : batches,
        datasets: source.map((source, index) => {
            return (
                {
                    label: source.category,
                    data: source.batchCounts,
                    backgroundColor: bgColors[index],
                }
            )
        })
      };
  return <Bar options={options} data={data} />;
}
